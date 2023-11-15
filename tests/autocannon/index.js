const autocannon = require('autocannon');

const instance = autocannon({
    url: 'http://localhost:3000/api/entries',
    connections: 1000,
    duration: 10,
    method: 'GET',
    overallRate: 10
}, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

autocannon.track(instance);

instance.on('done', (results) => {
    console.log(results);
});

instance.on('tick', (counter) => {
    console.log(counter);
});

instance.on('error', (err) => {
    console.error(err);
});