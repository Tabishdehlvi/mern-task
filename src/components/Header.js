export const Header = () => {
  return (
    <header
      className="relative bg-gray-400 text-black p-4 h-80 bg-cover bg-center"
      style={{
        backgroundImage: `url('bg-pizza.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-slate-500 bg-opacity-70 backdrop-blur-sm"></div>
      <div className="relative h-full flex justify-center items-center flex-col">
        <h1 className="text-5xl font-bold">Optimize Your Meal</h1>
        <p className="mt-7 text-center font-normal">
          Select Meal to Add in Week. You will be able to edit, modify, and
          change the Meal Weeks.
        </p>
      </div>
    </header>
  );
};
