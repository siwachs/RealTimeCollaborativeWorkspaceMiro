const Toolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Ellipsis</div>
      </div>

      <div className="flex flex-col items-center rounded-md bg-white p-1.5 shadow-md">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = function () {
  return (
    <div className="absolute left-2 top-1/2 flex h-[360px] w-[52px] -translate-y-1/2 flex-col gap-y-4 rounded-md bg-white shadow-md" />
  );
};

export default Toolbar;
