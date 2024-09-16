import type { Note } from '@t4/api/src/db/schema'
import { Paragraph, ScrollView } from '@t4/ui'
import { NoteListError } from '@t4/ui/src/notes/NoteListError'
import { type Message, NoteItem } from '@t4/ui/src/notes/NoteListItem'
import { trpc } from 'app/utils/trpc'
import { empty, error, loading, success } from 'app/utils/trpc/patterns'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView as RNScrollView } from 'react-native'
import { Button, Input, Spinner, XStack, YStack } from 'tamagui'
import { match } from 'ts-pattern'

export function MainInputPage() {
  const notes = trpc.note.userNotes.useQuery()

  const noteListLayout = match(notes)
    .with(error, () => <NoteListError message={notes.failureReason?.message} />)
    .with(loading, () => (
      <YStack fullscreen f={1} jc='center' ai='center'>
        <Paragraph pb='$3'>Loading...</Paragraph>
        <Spinner />
      </YStack>
    ))
    .with(empty, () => <Paragraph>No cars found.</Paragraph>)
    .with(success, () => notes.data && <ChatWithMePage notes={notes.data} />)
    .otherwise(() => <NoteListError message={notes.failureReason?.message} />)

  return (
    <YStack fullscreen f={1}>
      {noteListLayout}
    </YStack>
  )
}

function ChatWithMePage({ notes }: { notes: Note[] }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(
    notes.map((note) => ({
      text: note.content,
      tags: [],
      timestamp: new Date().toISOString(),
      prev: true,
    }))
  )
  const [editingMessage, setEditingMessage] = useState<Message | undefined>()
  const scrollViewRef = useRef<RNScrollView>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  const handleSubmit = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        prev: false,
        tags: generateTags(input),
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, newMessage])
      setInput('')
    }
  }

  const generateTags = (text: string): string[] => {
    const tags: string[] = []
    if (text.includes('?')) tags.push('#thought')
    if (text.includes('!')) tags.push('#emotion')
    if (text.length > 50) tags.push('#idea')
    return tags
  }

  const handleEdit = (index: number) => {
    const message = messages[index]
    if (message) {
      setEditingMessage(message)
      setInput(message.text)
    }
  }

  const handleSave = () => {
    if (editingMessage) {
      const updatedMessages = messages.map((msg) =>
        msg === editingMessage ? { ...msg, text: input, tags: generateTags(input) } : msg
      )
      setMessages(updatedMessages)
      setEditingMessage(undefined)
      setInput('')
    }
  }

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack f={1} p='$4' space>
        <ScrollView
          f={1}
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          {messages.map((msg, index) => (
            <NoteItem key={`${index}`} msg={msg} />
          ))}
        </ScrollView>
        {/* <VirtualList data={messages as any[]} renderItem={NoteItem} itemHeight={80} /> */}
        <XStack space>
          <Input
            f={1}
            value={input}
            onChangeText={setInput}
            placeholder='Enter your thought...'
            aria-label='Enter your thought'
          />
          <Button
            onPress={editingMessage ? handleSave : handleSubmit}
            aria-label={editingMessage ? 'Save edited message' : 'Send message'}
          >
            {editingMessage ? 'Save' : 'Send'}
          </Button>
        </XStack>
      </YStack>
    </KeyboardAvoidingView>
  )
}
