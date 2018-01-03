// region Page items
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

export interface PageItem {
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

export interface RootPages {
  pages: PageItem[]
}
//endregion

// region User items
export interface ActivityField {
  votes: number
  revisions: number
  pages: number
  lastActive?: DateField
  member: DateField
  highestRating?: number
  totalRating?: number
}

export interface UserItem {
  id: number
  name: string
  displayName: string
  deleted: number
  activity: { [key: string]: ActivityField }
}

export interface RootUsers {
  users: UserItem[]
}
// endregion

