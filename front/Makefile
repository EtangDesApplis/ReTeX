build: k8s
deploy: gh
k8s: 
	@rm package.json
	cp package.json_k8s package.json
	npm run build
	docker build -t antoinenguyen31/retex-front:210627-arm .
	docker push antoinenguyen31/retex-front:210627-arm
gh: 
	@rm package.json
	cp package.json_gh package.json
	npm run deploy
