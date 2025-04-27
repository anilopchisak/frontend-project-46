import * as fs from 'node:fs';

export default (paths) => {
    const parsed = paths
        .filter((path) => path.split('.')[1] === 'json')
        .map((path) => 
            fs.readFileSync(path, (err, data) => {
                if (err) throw err;
                console.log(data);
            }))
        .map((file) => {
            const parsedFile = JSON.parse(file)
            return parsedFile;
        });
    return parsed;
}
