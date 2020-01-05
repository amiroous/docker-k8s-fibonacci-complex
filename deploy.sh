# Build Images (Latest and Versioned Versions)
docker build -t amiroous/docker-k8s-fibonacci-complex-client:latest -t amiroous/docker-k8s-fibonacci-complex-client:"$GIT_SHA" -f ./client/Dockerfile ./client
docker build -t amiroous/docker-k8s-fibonacci-complex-server:latest -t amiroous/docker-k8s-fibonacci-complex-server:"$GIT_SHA" -f ./server/Dockerfile ./server
docker build -t amiroous/docker-k8s-fibonacci-complex-worker:latest -t amiroous/docker-k8s-fibonacci-complex-worker:"$GIT_SHA" -f ./worker/Dockerfile ./worker

# Push Images to Docker Hub
docker push amiroous/docker-k8s-fibonacci-complex-client:latest
docker push amiroous/docker-k8s-fibonacci-complex-client:"$GIT_SHA"
docker push amiroous/docker-k8s-fibonacci-complex-server:latest
docker push amiroous/docker-k8s-fibonacci-complex-server:"$GIT_SHA"
docker push amiroous/docker-k8s-fibonacci-complex-worker:latest
docker push amiroous/docker-k8s-fibonacci-complex-worker:"$GIT_SHA"

# Apply Kubernetes Config Files
kubectl apply -f k8s

# Set The Images to Updated Version by Git SHA
kubectl set image deployment/client-deployment client=amiroous/docker-k8s-fibonacci-complex-client:"$GIT_SHA"
kubectl set image deployment/server-deployment server=amiroous/docker-k8s-fibonacci-complex-server:"$GIT_SHA"
kubectl set image deployment/worker-deployment worker=amiroous/docker-k8s-fibonacci-complex-worker:"$GIT_SHA"
