import Navbar from "../../components/navbar";

const Home = () => {
  return (
    <>
    <Navbar />
    <main className="mt-[5rem]">
      <section className="grid grid-cols-12">
        <div className="col-span-12 p-[4rem]">
          <div className="mockup-window bg-base-300 border">
            <div className="bg-base-200 flex justify-center px-4 py-16">
              Hello!
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Home;
