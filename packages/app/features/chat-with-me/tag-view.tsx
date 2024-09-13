import React, { useState } from 'react'
import { ChevronLeft, Tag, MessageCircle, Filter } from '@tamagui/lucide-icons'
import {
  YStack,
  XStack,
  ScrollView,
  Button,
  Text,
  Card,
  H2,
  Paragraph,
  Sheet,
  Adapt,
  Select,
  Separator,
} from 'tamagui'

export function TagView() {
  const [currentTag, setCurrentTag] = useState('Anxiety')
  const [sortOrder, setSortOrder] = useState('newest')

  const [notes, setNotes] = useState([
    {
      id: 5,
      content: 'Feeling anxious about the upcoming team meeting. Need to prepare thoroughly.',
      date: '2023-06-20',
      tags: ['Anxiety', 'Work'],
    },
    {
      id: 4,
      content: 'Tried a new meditation technique today. It helped calm my anxiety a bit.',
      date: '2023-06-18',
      tags: ['Anxiety', 'Self-care'],
    },
    {
      id: 3,
      content: "I'm feeling anxious about my upcoming presentation.",
      date: '2023-06-10',
      tags: ['Anxiety', 'Presentation'],
    },
    {
      id: 2,
      content: 'Anxiety levels are high today. Going for a walk to clear my head.',
      date: '2023-06-05',
      tags: ['Anxiety', 'Self-care'],
    },
    {
      id: 1,
      content: 'First day at the new job. Feeling a mix of excitement and anxiety.',
      date: '2023-06-01',
      tags: ['Anxiety', 'Work'],
    },
  ])

  const sortNotes = (order) => {
    const sortedNotes = [...notes].sort((a, b) => {
      if (order === 'newest') {
        return new Date(b.date) - new Date(a.date)
      } else {
        return new Date(a.date) - new Date(b.date)
      }
    })
    setNotes(sortedNotes)
    setSortOrder(order)
  }

  return (
    <YStack f={1} backgroundColor='$background'>
      <XStack ai='center' jc='space-between' p='$4' backgroundColor='$color1'>
        <XStack ai='center'>
          <Button icon={ChevronLeft} circular mr='$2' onPress={() => console.log('Go back')} />
          <H2 color='$color12' ai='center'>
            <Tag size='$1' mr='$2' />
            {currentTag}
          </H2>
        </XStack>
        <Select
          value={sortOrder}
          onValueChange={(value) => sortNotes(value)}
          disablePreventBodyScroll
        >
          <Select.Trigger width={180} iconAfter={Filter}>
            <Select.Value placeholder='Sort order' />
          </Select.Trigger>

          <Adapt when='sm' platform='touch'>
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.Viewport minWidth={200}>
              <Select.Group>
                <Select.Label>Sort Order</Select.Label>
                <Select.Item index={0} value='newest'>
                  <Select.ItemText>Newest first</Select.ItemText>
                </Select.Item>
                <Select.Item index={1} value='oldest'>
                  <Select.ItemText>Oldest first</Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select>
      </XStack>

      <ScrollView f={1} p='$4'>
        <YStack space='$4'>
          {notes.map((note) => (
            <Card key={note.id} elevate bordered>
              <Card.Header>
                <Paragraph>{note.content}</Paragraph>
              </Card.Header>
              <Card.Footer>
                <XStack ai='center' jc='space-between' f={1}>
                  <XStack space='$2' flexWrap='wrap'>
                    {note.tags.map((tag, index) => (
                      <Button key={index} size='$2' circular theme='active'>
                        <Tag size='$1' mr='$1' />
                        <Text>{tag}</Text>
                      </Button>
                    ))}
                  </XStack>
                  <Text size='$2' color='$color11'>
                    {note.date}
                  </Text>
                </XStack>
              </Card.Footer>
            </Card>
          ))}
        </YStack>
      </ScrollView>

      <XStack p='$4' backgroundColor='$color1'>
        <Button f={1} icon={MessageCircle} theme='active'>
          New note with #{currentTag}
        </Button>
      </XStack>
    </YStack>
  )
}
