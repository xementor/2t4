import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, Text, Card, Button, XStack } from 'tamagui'

type Tag = {
  name: string
  count: number
}
export function TagsMetricsPage() {
  const [selectedTag, setSelectedTag] = useState<string>()

  // Mock data (replace with actual data in a real app)
  const tags = [
    { name: '#thought', count: 15 },
    { name: '#emotion', count: 8 },
    { name: '#idea', count: 12 },
  ]

  const entries = [
    { text: 'First thought of the day', tags: ['#thought'], timestamp: '2023-05-10T08:00:00Z' },
    { text: 'Feeling excited!', tags: ['#emotion'], timestamp: '2023-05-10T10:30:00Z' },
    { text: 'New project idea', tags: ['#idea'], timestamp: '2023-05-10T14:15:00Z' },
  ]

  return (
    <YStack f={1} p='$4' space>
      <Text fontSize='$6' fontWeight='bold'>
        Tags and Metrics
      </Text>
      <ScrollView>
        <XStack flexWrap='wrap' jc='space-between'>
          {tags.map((tag) => (
            <Button key={tag.name} size='$3' mb='$2' onPress={() => setSelectedTag(tag.name)}>
              {`${tag.name} (${tag.count})`}
            </Button>
          ))}
        </XStack>
        {selectedTag && (
          <YStack mt='$4'>
            <Text fontSize='$5' fontWeight='bold' mb='$2'>
              Entries for {selectedTag}
            </Text>
            {entries
              .filter((entry) => entry.tags.includes(selectedTag))
              .map((entry, index) => (
                <Card key={`${index}`} my='$2' p='$3'>
                  <Text>{entry.text}</Text>
                  <Text fontSize='$2' color='$gray10' mt='$2'>
                    {new Date(entry.timestamp).toLocaleString()}
                  </Text>
                </Card>
              ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  )
}
