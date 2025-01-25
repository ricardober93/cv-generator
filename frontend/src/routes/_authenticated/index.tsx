import { createFileRoute } from "@tanstack/react-router";

import { DeleteIcon } from "@chakra-ui/icons";
import { Alert, Card, Flex, IconButton, Table, } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Note } from "../../../../server/models/note";
import { allNotesQueryOptions, deleteNote, getNotesQueryOption } from "../../api/manager";
import { ProgressCircleRing, ProgressCircleRoot } from "../../components/ui/progress-circle";
import { StatLabel, StatRoot, StatValueText } from "../../components/ui/stat"
import { toaster } from "../../components/ui/toaster";

export const Route = createFileRoute("/_authenticated/")({
  component: () => <App />,
});

function App() {
  // Assume we have a state to store the notes
  const { data: notes, isLoading, isError } = useQuery(getNotesQueryOption);

  const { data: allNotes } = useQuery(allNotesQueryOptions);

  if (isLoading)
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100vw"
        h="100vh">
        <ProgressCircleRoot  value={null} >
          <ProgressCircleRing  />
        </ProgressCircleRoot>
      </Flex>
    );
  if (isError)
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100vw"
        h="100vh">
        <Alert.Root>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Tuvimos un problema</Alert.Title>
            <Alert.Description>Ha ocurrido errorOO.</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      p={5}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={5}>
        <Card.Root
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          flex="1">
          <StatRoot>
            <StatLabel fontSize="xl">Total Notes</StatLabel>
            <StatValueText fontSize="4xl" 
            value={notes ? notes.totalNotes : 0}
            />
          </StatRoot>
        </Card.Root>
      </Flex>

        <Table.Root >
          <Table.Caption>Imperial to metric conversion factors</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Content</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allNotes &&
              allNotes.notes.map((note: Note) => (
                <Table.Row  key={note.id}>
                  <Table.Cell>{note.id}</Table.Cell>
                  <Table.Cell>{note?.title}</Table.Cell>
                  <Table.Cell>{note?.content}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <DeleteNoteButton id={note.id} />{" "}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>

    </Flex>
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

      toaster.create({
        description: "Se ha eliminado la nota correctamente.",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error al eliminar la nota.",
        description: "No se ha podido eliminar la nota.",
        type: "error",
        duration: 9000,
      });
    },
  });

  return (
    <IconButton
      variant="ghost"
      aria-label="Delete"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate(id)}>
      <DeleteIcon color="red"></DeleteIcon>
    </IconButton>
  );
}
