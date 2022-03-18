import { forwardRef, InputHTMLAttributes } from 'react';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<NativeInputProps, any>((props: any, ref: any) => {
  return (
    <>
      <input {...props} data-testid={`${props.name}-input`} ref={ref as any} />
      {props.error && <div data-testid="input-error">{props.error.message}</div>}
    </>
  );
});

export default Input;
