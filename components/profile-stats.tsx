interface ProfileStatsProps {
  postsCount: number
  followersCount: number
  followingCount: number
}

export function ProfileStats({ postsCount, followersCount, followingCount }: ProfileStatsProps) {
  return (
    <div className="flex justify-center gap-8 py-4 border-y">
      <div className="text-center">
        <div className="font-bold text-lg">{postsCount}</div>
        <div className="text-sm text-muted-foreground">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg">{followersCount}</div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg">{followingCount}</div>
        <div className="text-sm text-muted-foreground">Following</div>
      </div>
    </div>
  )
}
