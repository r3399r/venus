import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = {
  open?: boolean;
  onClick?: () => void;
};

const Backdrop = forwardRef<HTMLDivElement, Props>(({ open, onClick }, ref) => (
  <div
    className={classNames('-z-10 fixed right-0 bottom-0 top-0 left-0 bg-slate-500 opacity-30', {
      'MuiBackdrop-open': open,
    })}
    ref={ref}
    onClick={onClick}
  />
));

export default Backdrop;
