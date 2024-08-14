export default {
  async beforeCreate(event) {
    const data = event.params;

    console.log('beforeCreate ts ...');

    if (data.body) {
      const wordsPerMinute = 200;
      const text = data.body;
      const wordCount = text.split(/\s+/).length;
      data.readTime = Math.ceil(wordCount / wordsPerMinute).toString();
    } else {
      data.readTime = '1';
    }
  },
  async beforeUpdate(event) {
    console.log('beforeUpdate ts...');
    let { data, where, select, populate } = event.params;

    if (data.body) {
      const wordsPerMinute = 200;
      const text = data.body;
      const wordCount = String(text).split(/\s+/).length;

      const time = Math.ceil(wordCount / wordsPerMinute);

      data.readTime = String(time);
    }else {
      data.readTime = '1ish';
    }
  },

  async afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
