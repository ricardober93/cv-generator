import { createFileRoute } from "@tanstack/react-router";

import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Note } from "../../../../server/models/note";
import { allNotesQueryOptions, deleteNote, getNotesQueryOption } from "../../api/manager";

export const Route = createFileRoute("/_authenticated/")({
  component: () => <App />,
});

function App() {
  // Assume we have a state to store the notes
  const { data: notes, isLoading, isError } = useQuery(getNotesQueryOption);

  const { data: allNotes } = useQuery(allNotesQueryOptions);

  if (isLoading)
    return (
      <section
        className="flex items-center justify-center w-full h-full ">

        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>

      </section>
    );
  if (isError)
    return (
      <section 
        className="flex items-center justify-center w-full h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">No se ha podido cargar las notas.</span>
        </div>
      </section>
    );

  return (
    <div
    className="flex flex-col">
      <div
      className="flex items-center justify-between">
        
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
           {/* crea una stat con tailwind */}

           <div className="flex items-center justify-between">
            <span className="">Total Notes</span>
            <p className="text-3xl" >

            {notes ? notes.totalNotes : 0}
            </p>
          </div>
        </div>
      </div>

        <section className="flex flex-col gap-4 p-4">
          <span className="">Imperial to metric conversion factors</span>
          <header>
            <div className="flex gap-4">
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
            </div>
          </header>
          <body>
            {allNotes &&
              allNotes.notes.map((note: Note) => (
                <div  key={note.id}>
                  <td>{note.id}</td>
                  <td>{note?.title}</td>
                  <td>{note?.content}</td>
                  <td>
                    <DeleteNoteButton id={note.id} />{" "}
                  </td>
                </div>
              ))}
          </body>
        </section>

    </div>
  );
}

function DeleteNoteButton({ id }: { id: number }) {
 const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allNotesQueryOptions.queryKey,
        exact: true,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: getNotesQueryOption.queryKey,
        exact: true,
        refetchType: "all",
      });
/* 
      toaster.create({
        description: "Se ha eliminado la nota correctamente.",
        type: "success",
      }); */
    },
    onError: () => {
   /*    toaster.create({
        title: "Error al eliminar la nota.",
        description: "No se ha podido eliminar la nota.",
        type: "error",
        duration: 9000,
      }); */
    },
  });

  return (
    <button className="cursor-pointer text-red-500 hover:text-red-700"
      aria-label="Delete"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate(id)}>
      <DeleteIcon color="red"></DeleteIcon>
    </button>
  );
}
