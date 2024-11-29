import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CarDodgeGame extends JPanel implements ActionListener {
    private Timer timer;
    private boolean gameOver = false;
    private int gas = 100;
    private int score = 0;

    private Rectangle car;
    private Rectangle obstacle;

    private JButton restartButton;

    public CarDodgeGame() {
        setPreferredSize(new Dimension(800, 600));
        setBackground(Color.LIGHT_GRAY);

        // Initialize game elements
        car = new Rectangle(375, 500, 50, 100); // Car position and size
        obstacle = new Rectangle(375, 300, 50, 100); // Obstacle position and size

        // Initialize game timer
        timer = new Timer(16, this); // ~60 FPS
        timer.start();

        // Create restart button (hidden initially)
        restartButton = new JButton("Restart");
        restartButton.setBounds(350, 250, 100, 50);
        restartButton.setVisible(false);
        restartButton.addActionListener(e -> restartGame());

        // Add button to the panel
        setLayout(null);
        add(restartButton);
    }

    // Restart game logic
    private void restartGame() {
        gameOver = false;
        gas = 100;
        score = 0;

        // Reset positions of the car and obstacle
        car.setBounds(375, 500, 50, 100);
        obstacle.setBounds(375, 300, 50, 100);

        // Hide restart button
        restartButton.setVisible(false);

        // Restart the timer
        timer.start();
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (gameOver) {
            // Display Game Over message
            g.setColor(Color.RED);
            g.setFont(new Font("Arial", Font.BOLD, 36));
            g.drawString("Game Over", 300, 200);
        } else {
            // Draw car
            g.setColor(Color.RED);
            g.fillRect(car.x, car.y, car.width, car.height);

            // Draw obstacle
            g.setColor(Color.BLUE);
            g.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            // Draw gas and score
            g.setColor(Color.BLACK);
            g.drawString("Gas: " + gas, 20, 20);
            g.drawString("Score: " + score, 20, 40);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (!gameOver) {
            // Update obstacle position
            obstacle.y += 2;
            if (obstacle.y > 600) {
                obstacle.y = -100;
                obstacle.x = (int) (Math.random() * (800 - obstacle.width));
                score++;
            }

            // Check for collision
            if (car.intersects(obstacle)) {
                gameOver = true;
                timer.stop();
                restartButton.setVisible(true); // Show restart button
            }

            // Update gas
            gas -= 1;
            if (gas <= 0) {
                gameOver = true;
                timer.stop();
                restartButton.setVisible(true); // Show restart button
            }

            // Repaint the game
            repaint();
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Car Dodge Game");
        CarDodgeGame gamePanel = new CarDodgeGame();
        frame.add(gamePanel);
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}