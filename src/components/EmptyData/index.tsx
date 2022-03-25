import { useTranslation } from 'next-i18next';

const EmptyData = () => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-black flex flex-col items-center justify-center">
      <span className="px-4 py-1 mt-80  text-gray-400">{t('empty-data')}</span>
    </div>
  );
};

export default EmptyData;
