import { useTranslation } from 'next-i18next';
import { useModal } from '../../../contexts/Modal/hooks/useModal';
import SpinnerAnimated from '../../SpinnerAnimated';

interface IProps {
  isDisabled: boolean;
}
const FooterButtons: React.FC<IProps> = ({ isDisabled }) => {
  const { toggleModal } = useModal();

  const { t } = useTranslation('common');

  if (isDisabled) {
    return <SpinnerAnimated />;
  }

  return (
    <>
      <div className="flex items-center justify-start w-full mt-6">
        <button
          type="submit"
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
          {t('save')}
        </button>
        <button
          className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
          onClick={toggleModal}>
          {t('cancel')}
        </button>
      </div>
      <button
        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
        onClick={toggleModal}
        aria-label="close modal"
        data-testid="submit-button"
        role="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </>
  );
};

export default FooterButtons;
