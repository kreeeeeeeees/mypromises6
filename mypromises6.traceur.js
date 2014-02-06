class Promise {

	constructor () {
		this.verb = null;
		this.listeners = [];
	}

	then(fulfill, reject) {
		var listener = { fulfill, reject, successor : new Promise() }
			, self = this;
		if (!this.verb)
			this.listeners.push(listener);
		else
			setTimeout(function () {
				self.call(listener);
			}, 0);
		return listener.successor;
	}

	resolve(result) {
		var type, then;
		if (result === this) throw new TypeError(); // TODO: same object check?
		type = result !== null && typeof result;
		if (type === 'object' || type === 'function') {
			try {
				then = result.then;
				if (typeof then === 'function') {
					this.delegate(result, then);
				} else {
					this.fulfill(result);
				}
			} catch (error) {
				this.reject(error);
			}
		} else {
			this.fulfill(result);
		}
	}

	delegate(promise, then) {
		var self = this, open = true;
		try {
			then.call(promise, function (result) {
				if (open) {
					open = false;
					self.resolve(result);
				}
			}, function (error) {
				if (open) {
					open = false;
					self.reject(error);
				}
			});
		} catch (error) {
			if (open) {
				open = false;
				this.reject(error);
			}
		}
	}

	fulfill(result) {
		this.close('fulfill', result);
	}

	reject(result) {
		this.close('reject', result);
	}

	close(verb, result) {
		var self = this;
		if (!this.verb) {
			this.verb = verb;
			this.result = result;
			setTimeout(function () {
				self.listeners.forEach(function (listener) {
					self.call(listener);
				});
			}, 0);
		}
	}

	call(listener) {
		var func = listener[this.verb]
			, result;
		if (typeof func === 'function') {
			try {
				result = func(this.result);
				listener.successor.resolve(result);
			} catch (error) {
				listener.successor.reject(error);
			}
		} else {
			listener.successor[this.verb](this.result);
		}
	}
}

if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = Promise;
}
