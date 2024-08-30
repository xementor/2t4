import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, Text, Card, Button, XStack } from 'tamagui'
import { Calendar } from '@tamagui/lucide-icons'

export function TimelinePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  // Mock data (replace with actual data in a real app)
  const entries = [
    { text: 'First thought of the day', tags: ['#thought'], timestamp: '2023-05-10T08:00:00Z' },
    { text: 'Feeling excited!', tags: ['#emotion'], timestamp: '2023-05-10T10:30:00Z' },
    { text: 'New project idea', tags: ['#idea'], timestamp: '2023-05-10T14:15:00Z' },
  ]

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <YStack f={1} p='$4' space>
      <XStack ai='center' jc='space-between'>
        <Text fontSize='$6' fontWeight='bold'>
          Timeline
        </Text>
        <Button
          icon={<Calendar size='$1' />}
          circular
          onPress={() => setShowCalendar(!showCalendar)}
        />
      </XStack>
      {showCalendar && (
        <Card p='$4' mb='$4'>
          {/* Implement a calendar component here */}
          <Text>Calendar Placeholder</Text>
        </Card>
      )}
      <ScrollView>
        {entries.map((entry, index) => (
          <Card key={`${index}`} my='$2' p='$3'>
            <Text fontWeight='bold'>{new Date(entry.timestamp).toLocaleTimeString()}</Text>
            <Text mt='$2'>{entry.text}</Text>
            <XStack mt='$2' space>
              {entry.tags.map((tag, i) => (
                <Text key={`${i}`} color='$blue10'>
                  {tag}
                </Text>
              ))}
            </XStack>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  )
}
