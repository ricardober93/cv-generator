import { createFileRoute } from "@tanstack/react-router";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allCurruculumQueryOptions, deleteNote, getCurruculumQueryOption } from "@/api/manager";

export const Route = createFileRoute("/_authenticated/")({
  component: () => <App />,
});

function App() {
  // Assume we have a state to store the notes
  const { data: notes, isLoading, isError } = useQuery(getCurruculumQueryOption);

  const { data } = useQuery(allCurruculumQueryOptions);

  if (isLoading)
    return (
      <section
        className="flex items-center justify-center w-full h-full ">

        <div className="animate-spin rounded-full h-32 w-32 border-2 border-b-2 border-zinc-800"></div>

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
    className="flex flex-col h-full p-4">
      <div
      className="flex items-center justify-between dark:text-white ">
        
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
           {/* crea una stat con tailwind */}

           <div className="flex items-center justify-between">
            <span className="">Tus hojas de vida</span>
            <p className="text-3xl" >

            {notes ? notes.totalNotes : 0}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}

function DeleteCurriculumButton({ id }: { id: number }) {
 const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allCurruculumQueryOptions.queryKey,
        exact: true,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: getCurruculumQueryOption.queryKey,
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
      <RiDeleteBin2Fill color="red"></RiDeleteBin2Fill>
    </button>
  );
}
