BIN=node_modules/.bin

test:
	make lint
	$(BIN)/mocha test/specs/

lint:
	$(BIN)/eslint cmd.js
	$(BIN)/eslint test/specs/

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha test/specs && $(BIN)/codecov

docs:
	$(BIN)/doxdox lib/cmd.js -p package.json -l Markdown -o DOCUMENTATION.md

.PHONY: test coverage
