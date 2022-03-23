import { forwardRef, InputHTMLAttributes } from 'react';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<NativeInputProps, any>((props: any, ref: any) => {
  return (
    <>
      <input {...props} data-testid={`${props.name}-input`} ref={ref as any} />
      {props.error && (
        <span
          data-testid="input-error"
          className="flex items-center absolute font-medium tracking-wide text-red-200 text-xs mt-1 ml-1">
          {props.error.message}
        </span>
      )}
    </>
  );
});

export default Input;
