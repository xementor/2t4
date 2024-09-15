import { trpc } from 'app/utils/trpc'
import React, { useState, useRef, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView as RNScrollView } from 'react-native'
import { YStack, XStack, Input, Button, Text, ScrollView, Card } from 'tamagui'

import { Check, CheckCheck, Loader } from '@tamagui/lucide-icons'

type Message = {
  text: string
  tags: string[]
  timestamp: string
}

export function MainInputPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
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
            <Message key={`${index}`} msg={msg} />
          ))}
        </ScrollView>
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
function Message({
  msg,
}: {
  msg: Message
}): React.JSX.Element {
  const addM = trpc.note.add.useMutation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    addM.mutate({ content: msg.text })
  }, [])

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
        {addM.isSuccess ? <CheckCheck size='$1' /> : <Check size='$1' />}
      </XStack>
    </Card>
  )
}
