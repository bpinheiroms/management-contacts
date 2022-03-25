import { forwardRef, InputHTMLAttributes } from 'react';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<NativeInputProps, any>((props: any, ref: any) => {
  return (
    <>
      <input
        {...props}
        data-testid={`${props.name}-input`}
        ref={ref as any}
        className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
      />
      {props.error && (
        <span
          data-testid="input-error"
          className="flex items-center font-medium tracking-wide text-red-600 text-xs ml-1">
          {props.error.message}
        </span>
      )}
    </>
  );
});

export default Input;
