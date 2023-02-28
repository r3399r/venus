import { ModalUnstyled } from '@mui/base';
import IcLoader from '../image/ic-loader.svg';
import Backdrop from './Backdrop';

type Props = {
  open: boolean;
};

const Loader = ({ open }: Props) => (
  <ModalUnstyled
    open={open}
    className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center"
    slots={{ backdrop: Backdrop }}
  >
    <div className="w-20 outline-none">
      <img src={IcLoader} />
    </div>
  </ModalUnstyled>
);

export default Loader;
