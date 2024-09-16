import { CheckCheck, Loader } from '@tamagui/lucide-icons'
import { trpc } from 'app/utils/trpc'
import React, { useEffect } from 'react'
import { Card, Spinner, Text, XStack } from 'tamagui'

export type Message = {
  text: string
  tags: string[]
  timestamp: string
  prev: boolean
}

export function NoteItem({
  msg,
}: {
  msg: Message
}): React.JSX.Element {
  const addM = trpc.note.add.useMutation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!msg.prev) addM.mutate({ content: msg.text })
  }, [])

  function Status() {
    if (msg.prev) return <CheckCheck size='$1' />
    if (addM.isLoading)
      return (
        <XStack jc='center' ai='center'>
          <Spinner />
        </XStack>
      )
    if (addM.isSuccess) return <CheckCheck size='$1' />
  }

  return (
    <Card key={msg.timestamp} mb='$2' p='$3'>
      <Text>{msg.text}</Text>
      <XStack mt='$2' space>
        {msg.tags.map((tag, i) => (
          <Text key={`${tag}-${i}`} color='$blue10'>
            {tag}
          </Text>
        ))}
      </XStack>

      <XStack jc='flex-end' ai='flex-end' mt='$-4'>
        {addM.isLoading && <Loader size='$1' />}
        <Text textAlign='right' mr='$2' fontSize={12}>
          {new Date(msg.timestamp).toLocaleTimeString()}
        </Text>
        <Status />
      </XStack>
    </Card>
  )
}
