export default function RouteValidator(path: string,routesToExclude:string[]) {
    let isMatched = false
    routesToExclude.map(route => {
        if (route.includes("*")) {
        const global = route.split("*")[0];
        isMatched = path.includes(global);
        if(isMatched) return;
        }
        else if (route == path) {
        isMatched = true;
        return;
    }
    })
    return isMatched
}
