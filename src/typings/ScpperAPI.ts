export interface AuthorField {
  user: string
  role: string
  id?: number
}

export interface DateField {
  date: string
  timezone_type: number
  timezone: string
}

export interface InfoItem {
  id: number
  name: string
  title: string
  altTitle: null | string
  status: 'Translation' | 'Original'
  kind: 'SCP' | 'Unknown'
  creationDate: DateField
  rating: number
  cleanRating: number
  contributorRating: number
  adjustedRating: number
  wilsonScore: number
  rank: number
  authors: AuthorField[]
}

export interface Root {
  pages: InfoItem[]
}
