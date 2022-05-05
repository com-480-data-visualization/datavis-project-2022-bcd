document.write("Entering .js file!");
import {list as wl_world} from './keywords_world.js';
import {list as wl_usa} from './keywords_usa.js';
import * from './wordcloud2.js';
if(!WordCloud.isSupported) document.getElementById("warning").innerHTML = "Your browser doesn't supply necessary functionalities for wordcloud2.js to run";
WordCloud(document.getElementById('world'), { list: wl_world } );
WordCloud(document.getElementById('usa'), { list: wl_usa} );
