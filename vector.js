/**
 * Represents a 2d vector.
 * @constructor
 * @param {Number} x - The 1st component of the vector.
 * @param {Number} y - The 2nd component of the vector.
 */
var Vector = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}


Vector.prototype.valueOf = function() {
	return [this.x, this.y];
}

Vector.prototype.clone = function() {
	return new Vector(this.x, this.y);
}


//-- Simple arithmetic --\\
Vector.prototype.add = function(v) {
	return new Vector(this.x + v.x, this.y + v.y);
}
Vector.prototype.sub = function(v) {
	return new Vector(this.x - v.x, this.y - v.y);
}
Vector.prototype.scale = function(n) {
	return new Vector(this.x * n, this.y * n);
}
Vector.prototype.mul = function(n) { return this.scale(n); };
Vector.prototype.div = function(n) { return this.scale(1 / n); };

//-- Magnitude methods --\\
Vector.prototype.magnitude = function() {
	return Math.sqrt(this.sqrMag());
}
Vector.prototype.sqrMag = function() {
	return Math.pow(this.x,2) + Math.pow(this.y,2);
}
Vector.prototype.normalize = function() {
	return this.scale(1 / this.magnitude());
}
Vector.prototype.setMagnitude = function(n) {
	return this.normalize().scale(n);
}

/** Don't let the vector be longer than n. */
Vector.prototype.limit = function(n) {
	// If the vector is longer, change its magnitude
	if(this.sqrMag() > n*n) return this.setMagnitude(n);
	return this;
}

/** Distance between two vectors. */
Vector.prototype.distance = function(v) {
	return v.sub(this).magnitude();
}
Vector.prototype.sqrDist = function(v) {
	return v.sub(this).sqrMag();
}

/**
 * Calculate the dot product
 * @param {Vector} v
 * @return {Number} The dot product of this vector and the given vector.
 */
Vector.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y;
}
/** Determinant */
Vector.prototype.det = function(v) {
	return this.x * v.y - this.y * v.x;
}
/** Scalar projection */
Vector.prototype.scalarProjection = function(v) {
	return v.setMagnitude(this.dot(v));
}

/** Angle between two vectors (between 0 and 1 radian). */
Vector.prototype.angle = function(v) {
	return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
}
/** Angle between two vectors (between 0 and 2 radians). */
Vector.prototype.angle2 = function(v) {
	return Math.atan2(this.dot(v), this.det(v));
}


// Export to NPM
module.exports = Vector;
