import { performance } from "perf_hooks";
import { useState } from "react";

interface UseValidationState<T> {
    loading: boolean;
    data?: T;
    error?: OES_element_index_uint;
}
type UseValidationResult<T> = [(data: any) => void, UseValidationState<T>];

export default function useValidation<T = any> (url: string) : UseValidationResult<T> {
    const [state, setState] = useState<UseValidationState<T>>({
        loading: false,
        data: undefined,
        error: undefined
    })

    function validation (data: any) {
        setState((pre) => ({ ...pre, loading: true }));
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json().catch(() => {}))
            .then((data) => setState((pre) => ({ ...pre, data })))
            .catch((error) => setState((pre) => ({ ...pre, error })))
            .finally(() => setState((pre) => ({ ...pre, loading: false })));
    }

    return [validation, { ...state }];
}