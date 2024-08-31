import React from 'react'
import { ScrollView } from 'react-native'
import { YStack, Text, Switch, Button, Select, Separator, XStack } from 'tamagui'

export function SettingsPage() {
  return (
    <ScrollView>
      <YStack f={1} p='$4' space>
        {/* <Text fontSize='$6' fontWeight='bold'>
          Settings
        </Text> */}

        <YStack space='$4'>
          <Text fontSize='$5' fontWeight='bold'>
            Account
          </Text>
          <Button>Edit Profile</Button>
          <Button>Change Password</Button>
        </YStack>

        <Separator />

        <YStack space='$4'>
          <Text fontSize='$5' fontWeight='bold'>
            Notifications
          </Text>
          <XStack space ai='center'>
            <Switch />
            <Text>Enable Push Notifications</Text>
          </XStack>
        </YStack>

        <Separator />

        <YStack space='$4'>
          <Text fontSize='$5' fontWeight='bold'>
            Data Management
          </Text>
          <Button>Backup Data</Button>
          <Button>Restore Data</Button>
        </YStack>

        <Separator />

        <YStack space='$4'>
          <Text fontSize='$5' fontWeight='bold'>
            Appearance
          </Text>
          <Select>
            <Select.Trigger>
              <Select.Value placeholder='Select theme' />
            </Select.Trigger>
            <Select.Content>
              <Select.Item index={0} value='light'>
                <Select.ItemText>Light</Select.ItemText>
              </Select.Item>
              <Select.Item index={1} value='dark'>
                <Select.ItemText>Dark</Select.ItemText>
              </Select.Item>
              <Select.Item index={2} value='system'>
                <Select.ItemText>System</Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select>
        </YStack>

        <Separator />

        <YStack space='$4'>
          <Text fontSize='$5' fontWeight='bold'>
            Privacy
          </Text>
          <Button>Manage Privacy Settings</Button>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
