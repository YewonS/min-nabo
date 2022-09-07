import type { NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCircleCheck, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, User, Answer } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useValidation from "@libs/client/useValidation";
import { joinClassNames } from "@libs/client/utils";
import { useEffect } from "react";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    answers: number,
    votes: number
  }
}

interface CommunityPostResponse {
  success: boolean;
  post: PostWithUser;
  hasVoted: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  success: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<CommunityPostResponse>(router.query.id ? `/api/posts/${router.query.id}` : null);
  const [ vote, {loading} ] = useValidation(`/api/posts/${router.query.id}/vote`);
  const { register, handleSubmit, reset } = useForm<AnswerForm>();

  const onVote = () => {
    if (!data) return;
    mutate({ 
      ...data, 
      post: {
        ...data?.post,
        _count: {
          ...data?.post._count, 
          votes: data.hasVoted ? data.post._count.votes - 1 : data.post._count.votes + 1
        }
      },
      hasVoted: !data.hasVoted,
    }, false);
    if (!loading) {
      vote({});
    }
  }

  const [ sendAnswer, {data: answerData, loading: answerLoading}] = useValidation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);
  const onValid = (formData: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(formData);
  }

  useEffect(() => {
    if (answerData && answerData.success) {
      reset();
      mutate();
    }
  }, [answerData, reset]);

  return (
      <Layout canGoBack>
        <div>
          <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Question
          </span>
          {/* Profile */}
          <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">{data?.post?.user.name}</p>
              <Link href={`/users/profiles/${data?.post?.user.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div>
            {/* Question */}
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-orange-500 font-medium">Q. </span> 
               {data?.post?.question}
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
              <button 
                onClick={onVote} 
                className={joinClassNames("flex space-x-2 items-center text-sm", data?.hasVoted ? "text-green-500" : "")}
              >
                <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                <span>Vote {data?.post?._count.votes}</span>
              </button>
              <span className="flex space-x-2 items-center text-sm">
                <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
                <span>Answer {data?.post?._count.answers}</span>
              </span>
            </div>
          </div>
          {/* Answer */}
          <div className="px-4 my-5 space-y-5">
            {data?.post?.answers.map(answer => 
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                {/* TODO: take care of this datetime */}
                <span className="text-xs text-gray-500 block ">{answer.createdAt.toString()}</span>
                <p className="text-gray-700 mt-2">
                  {answer.answer}
                </p>
              </div>
            </div>
            )}
          </div>
          {/* Reply */}
          <form className="px-4" onSubmit={handleSubmit(onValid)}>
            <TextArea
              register={
                register("answer", { required: true, minLength: 5 })
              }
              name="answer"
              placeholder="Answer this question!"
              required
            />
            <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
              {answerLoading ? "Loading..." : "Reply"}
            </button>
          </form>
        </div>
      </Layout>
  );
};

export default CommunityPostDetail;