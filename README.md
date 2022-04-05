# COM-480-datavis-BCD-project
This repository is for the group project of EPFL course COM-480 2021-22 provided in 2nd term.

## Milestone 1 (Friday 8th April, 5pm)

### 1 Problematic

Frame the general topic of your visualization and the main axis that you want to develop.

* What am I trying to show with my visualization?
* Think of an overview for the project, your motivation, and the target audience.

Contents here:
Influential factors for votes:

* duration
* language
* country

Relationship between votes and income & budget

Casted actors and movies

### 2 Dataset

#### 2.1 Dataset introduction

This project is based on dataset [IMDb Movies dataset from 2000 - 2020](https://www.kaggle.com/datasets/chenyanglim/imdb-v2/code) updated by CHEN YANG LIM, which containing 5,487 movies with their published dates, budgets, country, language, etc. All data are contained in one csv file [IMDB_Movies_2000_2020.csv](https://github.com/com-480-data-visualization/datavis-project-2022-bcd/blob/main/IMDB_Movies_2000_2020.csv) which consists of 5487 rows and  24 columns. Each row represents an instance of movies and columns show their attributes: 'imdb_title_id', 'title', 'original_title', 'year', 'date_published', 'genre', 'duration', 'country', 'language_1', 'language_2', 'language_3', 'director', 'writer', 'actors', 'actors_1', 'actors_f2', 'description', 'desc35', 'avg_vote', 'votes', 'budget', 'usa_gross_income', 'worlwide_gross_income', 'reviews_from_users'. Data are mostly clean and provided in String format. 

#### 2.2 Data pre-processing

* We noticed that 'budget' and  'worlwide_gross_income' columns involve different currencies and we have utilized [Currency Converter](https://pypi.org/project/CurrencyConverter/) package to unify the currencies into USA dollars based the exchange rate on 31-03-2021. We removed data which were not supported by the converter and those without real-time exchange rates.
* Since column 'country' lists all participated country in one string, we have split them and made a separate count for each country. Column 'actors' are processed in a similar way.
* We have combined 'language_1', 'language_2', 'language_3' to count in the aggregate for each language, ignoring the difference between original language and the translated versions.
* We have casted numbers in the form from 'str' into 'int' or 'float' type to facilitate later analysis and visualization. 

#### 2.3 Exploratory Data Analysis

Please check out content here: [Data analysis](https://github.com/wychen9/COM-480-datavis-BCD-project/blob/2955cd5061e95a4a7f52900c9029ebe13003a8be/Data_Visualization_M1.ipynb)


### 3 Related work

* What others have already done with the data?

  We have read the codes of this dataset and similar data related to movies on Kaggle and found out that most people are programming [Contents based recommender](https://www.kaggle.com/code/chenyanglim/content-based-recommender) using those datasets as an input. 

* Why is your approach original?

  We have checked previous projects of COM-480 and only found one group visualizing similar data relevant to movies,  and details can be checked [here](). They had done the work based on [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata), which is a minimized version of movie data provided by Kaggle. Since their website has already expired, we have watched their demo video. Their project was  focused on the genre and actors of movies, while ours will mainly concentrate on average votes, budget and income, which means our websites will be more likely to suit investors and audience looking for movies with high votes and high box office return. 

* What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

  We did acquire some inspirations from the websites exhibited in this course, such as [DuelingData-The Beatles](http://duelingdata.blogspot.com/2016/01/the-beatles.html), which is concise but informative as well. We would also like to set up a website as interactive and attractive as that one. And we prefer to let visitors gain a direct intuition and get a better understanding of the data, like the one [Facebook Map](https://www.facebook.com/notes/10158791468612200/) could do. 

## Milestone 2 (Friday 6th May, 5pm)
10% of the final grade
Two A4 pages describing the project goal.
* Include sketches of the vizualiation you want to make in your final product.
* List the tools that you will use for each visualization and which (past or future)
lectures you will need.
* Break down your goal into independent pieces to implement. Try to design a core visualization (minimal viable product) that will be required at the end. Then list extra ideas (more creative or challenging) that will enhance the visualization but could be dropped without endangering the meaning of the project.
Functional project prototype review.
* You should have an initial website running with the basic skeleton of the visualization/widgets.
 
## Milestone 3 (Friday 3rd June, 5pm) 
80% of the final grade
For the final milestone, you need to create a cool, interactive, and sufficiently complex D3.js (and other) data viz on the dataset you chose. Tell a data story and explain it to the targeted audience. Create a process book that details how you got there, from the original idea to the final product.
You need to deliver the following things:
### Github repository with a README
* Host the code and data on Github (if data is too big, link to a cloud
storage) with your process book as a PDF file
* Add a README file that explains the technical setup and intended usage
* Code should be clean, manageable, and using the latest practices
### Screencast
* Demonstrate what you can do with your viz in a fun, engaging and
impactful manner
* Talk about your main contributions rather than on technical details o 2 min video (not more)
### Processbook(max8pages)
* Describe the path you took to obtain the final result
* Explain challenges that you faced and design decisions that you took 
* Reuse the sketches/plans that you made for the first milestone, expanding them and explaining the changes
* Care about the visual/design of this report
* Peer assessment: include a breakdown of the parts of the project completed by each team member.

**The grading is the following:**
* Visualization (35%)
* Technical Implementation (15%)
* Screencast (25%)
* Process book (25%)

**Grades may vary across the team members, based on the process book and the peer assessment process. Please provide clear explanations.
Late policy**
  
* < 24h: 80% of the grade for the milestone
* < 48h: 70% of the grade for the milestone
