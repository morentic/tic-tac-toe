bash-node:
	docker run --rm -it -u node -v ${PWD}:/home/node/app -w /home/node/app node:16 bash