if(Posts.find().count() === 0){
    Posts.insert({
        title: '今天天气不错',
        author: 'hello',
        date: new Date()
    });
    Posts.insert({
        title: '今天天气不错',
        author: 'hello',
        date: new Date()
    });
    Posts.insert({
        title: '明天天气不错',
        author: 'world',
        date: new Date()
    });
    Posts.insert({
        title: '明天天气不错',
        author: 'world',
        date: new Date()
    });
}