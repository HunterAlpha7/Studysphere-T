import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </>
  );
}