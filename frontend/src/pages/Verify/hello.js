const users = [
    {
        username: 'jane',
        age: 20
    },
    {
        username: 'doe',
        age: 30
    },
    {
        username: 'tom',
        age: 23
    },
]
// 0 included 2 exluded
const filterUser = users.filter((item) => {
    return item.age > 20
})

console.log(filterUser);

