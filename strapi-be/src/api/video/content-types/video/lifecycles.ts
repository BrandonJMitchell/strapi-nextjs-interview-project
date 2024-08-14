import ffmpeg from 'fluent-ffmpeg';

export default {
  async beforeCreate(event) {
    const {data} = event.params;
    console.log('beforeCreate ts ...');
    // Ensure data contains the video URL
    if (data.video && data.video[0].url) {
      try {
        const rootDir = process.cwd();
        const filePath = `${rootDir}/public${data.video[0].url}`;

        // Get the video duration
        const duration = await new Promise<number>((resolve, reject) => {
          ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
              return reject(err);
            }
            resolve(metadata.format.duration);
          });
        });

        data.duration = duration;
      } catch (error) {
        console.error('Error in beforeUpdate ts:', error);
        throw error;
      }
    }

  },
  async beforeUpdate(event) {
    let { data, where, select, populate } = event.params;
      // Ensure data contains the video URL
      if (data.video && data.video[0].url) {
        try {
          const rootDir = process.cwd();
          const filePath = `${rootDir}/public${data.video[0].url}`;

          // Get the video duration
          const duration = await new Promise<number>((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
              if (err) {
                return reject(err);
              }
              resolve(metadata.format.duration);
            });
          });

          data.duration = duration;
      } catch (error) {
        console.error('Error in beforeUpdate ts:', error);
        throw error;
        }
      }
  },

  async afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
