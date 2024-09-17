import Room from "@/components/room";
import Canvas from "./_components/canvas";

type PageProps = { params: { boardId: string } };

function BoardIdPage({ params }: Readonly<PageProps>) {
  return (
    <Room roomId={params.boardId}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}

export default BoardIdPage;
