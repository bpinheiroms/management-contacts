import { useListContacts } from '../../services/useListContacts';
import { IContact } from '../../shared/types';
import ContactItem from '../ContactItem';
import EmptyData from '../EmptyData';
import SpinnerAnimated from '../SpinnerAnimated';

const ListContacts = () => {
  const queryContacts = useListContacts();

  if (queryContacts.isLoading) {
    return <SpinnerAnimated />;
  }

  return (
    <>
      <div className=" flex ml-8 mb-8 flex-col m items-center justify-center">
        <div className="flex flex-row flex-wrap gap-5 mt-8">
          {queryContacts.isSuccess && (
            <>
              {queryContacts.data.length === 0 ? (
                <EmptyData />
              ) : (
                <>
                  {queryContacts.data.map((data: IContact, index: number) => (
                    <ContactItem key={data.id} data={data} index={index} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListContacts;
