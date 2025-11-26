using System.Data;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static AdminPage.db_config;

namespace AdminPage
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            if (TestConnection())
            {
                InitializeComponent();
                LoadData();
            }
            else
            {
                MessageBox.Show("Nem lehet csatlakozni az adatbázishoz!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Application.Current.Shutdown(); // Bezárja az alkalmazást
            }

        }

        private bool TestConnection()
        {
            string connectionString = "server=localhost;user=root;password=;database=parking";
            try
            {
                using (var conn = new MySql.Data.MySqlClient.MySqlConnection(connectionString))
                {
                    conn.Open();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private bool LoadData()
        {
            userTable.ItemsSource = DatabaseHelper.GetData("SELECT * FROM users").DefaultView;
            
            if (userTable.ItemsSource != null) { return true; } else { return false; }
        }

        private void LoadData_Click(object sender, RoutedEventArgs e)
        {
            LoadData();
        }

        private void Add_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(tbName.Text) && !string.IsNullOrWhiteSpace(tbEmail.Text) && !string.IsNullOrWhiteSpace(tbPhoneNum.Text) && !string.IsNullOrWhiteSpace(tbPassword.Text))
            {
                string query = $"INSERT INTO users (name, email, phone_num, password) VALUES ('{tbName.Text}', '{tbEmail.Text}', '{tbPhoneNum.Text}', '{tbPassword.Text}')";
                DatabaseHelper.ExecuteQuery(query);
                LoadData();
                ClearFields();
            }
            else
            {
                MessageBox.Show("Kérlek, töltsd ki az összes mezőt!");
            }
        }

        private void Delete_Click(object sender, RoutedEventArgs e)
        {
            if (userTable.SelectedItem is DataRowView row)
            {
                int id = Convert.ToInt32(row["id"]);
                string query = $"DELETE FROM users WHERE id = {id}";
                DatabaseHelper.ExecuteQuery(query);
                LoadData();
            }
            else
            {
                MessageBox.Show("Válassz ki egy sort a törléshez!");
            }
        }

        private void UsersGrid_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (userTable.SelectedItem is DataRowView row)
            {
                tbId.Text = row["id"].ToString();
                tbName.Text = row["name"].ToString();
                tbEmail.Text = row["email"].ToString();
                tbPhoneNum.Text = row["phone_num"].ToString();
                tbPassword.Text = row["password"].ToString();
                tbRegistered.Text = row["registered_at"].ToString();
            }
        }

        private void Update_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(tbId.Text))
            {
                MessageBox.Show("Válassz ki egy sort a módosításhoz!");
                return;
            }

            int id = int.Parse(tbId.Text);
            string name = tbName.Text;
            string email = tbEmail.Text;
            string phoneNum = tbPhoneNum.Text;
            string password = tbPassword.Text;
            string registered = tbRegistered.Text;

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
            {
                MessageBox.Show("A név és email mező nem lehet üres!");
                return;
            }

            string query = $"UPDATE users SET name = '{name}', email = '{email}', phone_num = '{phoneNum}', password = '{password}', registered_at = '{registered}' WHERE id = {id}";
            DatabaseHelper.ExecuteQuery(query);
            LoadData();
            ClearFields();
            MessageBox.Show("Sikeres módosítás!");
        }

        private void ClearFields()
        {
            tbId.Clear();
            tbName.Clear();
            tbEmail.Clear();
            tbPhoneNum.Clear();
            tbPassword.Clear();
            tbRegistered.Clear();
        }
    }
}