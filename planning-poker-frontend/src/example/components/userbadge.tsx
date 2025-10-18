


function UserBadge({ name = 'gest', score = 10}) {
    return (
        <div>
            <p>{name}<span>={score}</span></p>
        </div>
    )
}
export default UserBadge;