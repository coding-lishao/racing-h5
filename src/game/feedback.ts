export type FeedbackType = 'collision' | 'coin' | 'nitro'

export type FeedbackEvent = {
  type: FeedbackType
  text: string
}

export const createFeedback = (type: FeedbackType, amount = 0): FeedbackEvent => {
  if (type === 'collision') return { type, text: '撞击！' }
  if (type === 'coin') return { type, text: `+${amount} 金币` }
  return { type, text: `氮气 +${amount}%` }
}
