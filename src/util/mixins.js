
// split up an array into buckets with a max size of 'size'
// per bucket 
module.exports.each_slice = function (array, size, callback){
  for (var i = 0, l = array.length; i < l; i += size){
    callback.call(array, array.slice(i, i + size));
  }
};