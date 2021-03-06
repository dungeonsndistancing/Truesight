CLIENTPORT=8080
SERVERPORT=5000

help()
{
    echo "" 
    echo "Usage: $0 -c Client port, -b Server Port"
    exit 1
}

while getopts "c:s:h:" ports; do
    case "${ports}" in
        c)
            CLIENTPORT=${OPTARG};;
        s)
            SERVERPORT=${OPTARG};;
        h) help ;;
    esac
done

echo $CLIENTPORT
echo $SERVERPORT
export SERVERPORT=$SERVERPORT
export CLIENTPORT=$CLIENTPORT
docker-compose --project-name dndapp down
docker-compose --project-name dndapp up -d