import stylesFilter from './filter.module.css'
import stylesDashboard from './dashboard.module.css'
import stylesNavbar from './navbar.module.css'

export default function page() {
  return (
    <>
      <div className='p-8 mb-8'>
        <h2 className='text-3xl mb-4'>Overview</h2>
        <div className={stylesFilter['filter-container']}>
          <h3>Filter Transactions</h3>
          <form className={stylesFilter['filter-form']}>
            <div className={stylesFilter['filter-group']}>
              <label>Start Date</label>
              <input type="date" name="start_date" />
            </div>

            <div className={stylesFilter['filter-group']}>
              <label>End Date</label>
              <input type="date" name="end_date" />
            </div>

            <div className={stylesFilter['filter-group']}>
              <label>Category</label>
              <select name="category">
                <option value="">All</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="salary">Salary</option>
              </select>
            </div>

            <div className={stylesFilter['filter-group']}>
              <label>Type</label>
              <select name="type">
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <button type="submit" className={stylesFilter.submit}>Apply Filter</button>
          </form>
        </div>
        <div className={stylesDashboard['dashboard-container']}>
          <div className={stylesDashboard['summary-cards']}>
            <div className={stylesDashboard.cardPemasukan}>
              <h3 className={stylesDashboard.cardH3}>Total Income</h3>
              <p className={stylesDashboard.cardP}>Rp 3,000,000</p>
            </div>
            <div className={stylesDashboard.cardPengeluaran}>
              <h3 className={stylesDashboard.cardH3}>Total Expense</h3>
              <p className={stylesDashboard.cardP}>Rp 750,000</p>
            </div>
            <div className={stylesDashboard.cardSaldo}>
              <h3 className={stylesDashboard.cardH3}>Balance</h3>
              <p className={stylesDashboard.cardP}>Rp 2,250,000</p>
            </div>
          </div>
        </div>
      </div>
      <nav className={stylesNavbar['responsive-nav']}>
        <a href="#dashboard">Dashboard</a>
        <a href="#transactions">Transactions</a>
        <a href="#categories">Categories</a>
        <a href="#logout">Logout</a>
      </nav>
    </>
  )
}