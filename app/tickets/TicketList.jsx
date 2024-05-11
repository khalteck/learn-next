import Link from "next/link";

const TicketList = async () => {
  async function getTickets() {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch("http://localhost:4000/tickets", {
      next: {
        revalidate: 0, //0 means DO NOT CACHE data
      },
    });
    return res.json();
  }

  const tickets = await getTickets();

  return (
    <>
      {tickets?.map((item, index) => {
        return (
          <div key={index} className="card my-5">
            <Link href={`/tickets/${item?.id}`}>
              <h3>{item?.title}</h3>
              <p>{item?.body?.slice(0, 200)}...</p>
              <div className={`pill ${item?.priority}`}>
                {item?.priority} priority
              </div>
            </Link>
          </div>
        );
      })}
      {tickets?.length === 0 && (
        <p className="text-center">There are no open tickets, Yay! </p>
      )}
    </>
  );
};

export default TicketList;
