import * as fs from 'node:fs';

export default (paths) => {
    paths.forEach((path) => {
        if (path.split('.')[1] === 'json') {
            const file = fs.readFileSync(path, (err, data) => {
                if (err) throw err;
                console.log(data);
            });
            console.log(JSON.parse(file));
        }
    })
}