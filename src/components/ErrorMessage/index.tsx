import { useTranslation } from 'next-i18next';

interface IProps {
  error?: any;
}

const ErrorMessage: React.FC<IProps> = ({ error }) => {
  const { t } = useTranslation('common');

  return (
    <>
      {error && (
        <div className="flex gap-4 bg-red-100 p-4 rounded-md mt-2">
          <div className="space-y-1 text-sm">
            <h6 className="font-medium text-red-900">{t('error-title')}</h6>
            <p className="text-red-700 leading-tight">{error}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
