import { notFound } from "next/navigation";

export const dynamicParams = true;

//to load all dynamic pages statically
export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();

  return tickets?.map((item) => ({
    id: item?.id,
  }));
}

const TicketDetails = async ({ params }) => {
  async function getTicket(id) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      next: {
        revalidate: 60, //0 means DO NOT CACHE data
      },
    });

    if (!res.ok) {
      notFound();
    }

    return res.json();
  }

  const ticket = await getTicket(params?.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className="card">
        <h3>{ticket?.title}</h3>
        <small>{ticket?.user_email}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket?.priority}`}>
          {ticket?.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
